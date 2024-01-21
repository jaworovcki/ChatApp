using API.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace API.Hubs;

public class ChatHub : Hub
{
  private readonly ChatService _chatService;

  public ChatHub(ChatService chatService)
  {
    _chatService = chatService;
  }

  public override async Task OnConnectedAsync()
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, "Come2Chat");
    await Clients.Caller.SendAsync("UserConnected");
  }

  public override async Task OnDisconnectedAsync(Exception exception)
  {
    await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Come2Chat");

    var user = _chatService.GetUserByConnectionId(Context.ConnectionId);
    _chatService.RemoveUserFormList(user);
    await DisplayOnlineUsers();
    await base.OnDisconnectedAsync(exception);
  }

  public async Task AddUserConnectionId(string name)
  {
    _chatService.AddUserConnectionId(name, Context.ConnectionId);
    await DisplayOnlineUsers();
  }

  public async Task RecieveMessage(MessageDto message)
  {
    await Clients.Group("Come2Chat").SendAsync("NewMessage", message);
  }

  private async Task DisplayOnlineUsers()
  {
    var onlineUsers = _chatService.GetOnlineUsers();
    await Clients.Group("Come2Chat").SendAsync("OnlineUsers", onlineUsers);
  }

}
