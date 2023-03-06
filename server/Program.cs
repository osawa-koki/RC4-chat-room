namespace rc4_chat_room
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      builder.Services.AddSignalR();

      var MyCORS = "MyCORS";
      builder.Services.AddCors(options =>
      {
        options.AddPolicy(name: MyCORS,
          policy =>
          {
            policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
          });
      });

      var app = builder.Build();

      // Configure the HTTP request pipeline.
      if (!app.Environment.IsDevelopment())
      {
        app.UseExceptionHandler("/Error");
      }
      app.UseCors(MyCORS);
      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseRouting();
      app.MapHub<ChatHub>("/chatHub");

      app.Run("http://0.0.0.0:8000");
    }
  }
}
