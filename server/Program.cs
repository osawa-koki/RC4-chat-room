namespace rc4_chat_room
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      builder.Services.AddSignalR();

      var app = builder.Build();

      // Configure the HTTP request pipeline.
      if (!app.Environment.IsDevelopment())
      {
        app.UseExceptionHandler("/Error");
      }
      app.UseStaticFiles();

      app.UseRouting();
      app.MapHub<ChatHub>("/chatHub");

      app.Run();
    }
  }
}
