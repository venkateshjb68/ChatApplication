import json
from channels.generic.websocket import AsyncWebsocketConsumer

# GLOBAL VARIABLE (Accessed by views.py)
active_users = {}

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "global_chat"
        self.room_group_name = f"chat_{self.room_name}"
        self.username = None # Placeholder

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        if self.channel_name in active_users:
            del active_users[self.channel_name]
        await self.broadcast_user_list()
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        msg_type = data.get('type', 'chat_message')

        if msg_type == 'join':
            self.username = data['username']
            active_users[self.channel_name] = self.username
            await self.broadcast_user_list()
            await self.channel_layer.group_send(self.room_group_name, {
                'type': 'chat_message',
                'message': f'{self.username} joined.',
                'username': 'System',
                'is_system': True
            })

        elif msg_type == 'chat_message':
            await self.channel_layer.group_send(self.room_group_name, {
                'type': 'chat_message',
                'message': data['message'],
                'username': data['username'],
                'is_system': False
            })

        # Forward P2P/File signals
        elif msg_type in ['file_announcement', 'webrtc_offer', 'webrtc_answer', 'new_ice_candidate', 'request_download']:
             await self.channel_layer.group_send(self.room_group_name, {
                'type': 'pass_through', # Generic handler
                'payload': data
            })

    # --- HANDLERS ---
    
    # 1. Standard Chat & System Messages
    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    # 2. User List Update
    async def user_list_update(self, event):
        await self.send(text_data=json.dumps(event))

    # 3. Generic Pass Through (File/P2P)
    async def pass_through(self, event):
        await self.send(text_data=json.dumps(event['payload']))

    # 4. ADMIN COMMANDS (New)
    async def admin_command(self, event):
        command = event['command']
        
        # CLEAR CHAT
        if command == 'clear':
            await self.send(text_data=json.dumps({'type': 'clear_chat'}))
            
        # KICK USER
        elif command == 'kick':
            target = event['target']
            if self.username == target:
                # Tell frontend to reload/alert
                await self.send(text_data=json.dumps({'type': 'kick_event'}))
                # Close connection from server side
                await self.close()

    # Helper
    async def broadcast_user_list(self):
        unique_users = list(set(active_users.values()))
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'user_list_update',
            'users': unique_users
        })