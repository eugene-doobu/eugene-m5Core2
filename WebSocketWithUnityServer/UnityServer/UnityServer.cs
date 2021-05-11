using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using WebSocketSharp;
using WebSocketSharp.Server;

public class UnityServer : MonoBehaviour
{
    WebSocketServer server;
    Queue<string> messages = new Queue<string>();

    [System.Obsolete]
    void Start()
    {
        server = new WebSocketServer(8081);
        server.AddWebSocketService("/", () => new Echo()
        {
            Messages = messages
        });
        server.Start();
    }

    void Update()
    {
        if (messages.Count() > 0)
        {
            string recv_msg = messages.Dequeue();
            Debug.Log(recv_msg);
        }
    }
}

public class Echo : WebSocketBehavior
{
    public Queue<string> Messages;

    protected override void OnMessage(MessageEventArgs e)
    {
        Messages.Enqueue(e.Data);
        Sessions.Broadcast(e.Data);
    }
}