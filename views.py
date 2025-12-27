from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .consumers import active_users # Import active users list

def index(request):
    return render(request, 'chat/index.html')

def admin_dashboard(request):
    # Retrieve current active users from memory
    # Note: In production with multiple workers, this requires Redis/DB tracking.
    current_users = list(set(active_users.values()))
    
    if request.method == "POST":
        channel_layer = get_channel_layer()
        room_group_name = "chat_global_chat"

        if 'kick_user' in request.POST:
            user_to_kick = request.POST['kick_user']
            async_to_sync(channel_layer.group_send)(
                room_group_name,
                {
                    "type": "admin_command",
                    "command": "kick",
                    "target": user_to_kick
                }
            )
        
        elif 'clear_chat' in request.POST:
            async_to_sync(channel_layer.group_send)(
                room_group_name,
                {
                    "type": "admin_command",
                    "command": "clear"
                }
            )
        
        return redirect('admin_dashboard')

    return render(request, 'chat/admin.html', {'users': current_users})

@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(file.name, file)
        file_url = fs.url(filename)
        return JsonResponse({'file_url': file_url, 'filename': filename})
    return JsonResponse({'error': 'Failed'}, status=400)