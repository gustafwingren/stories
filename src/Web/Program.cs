using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Serilog;
using Serilog.Extensions.Logging;
using Web.Auth;
using Web.Configurations;
using Web.PreProcessors;

var builder = WebApplication.CreateBuilder(args);

var logger = Log.Logger = new LoggerConfiguration()
	.Enrich.FromLogContext()
	.WriteTo.Console()
	.CreateLogger();

logger.Information("Starting web host");

var appLogger = new SerilogLoggerFactory(logger)
	.CreateLogger<Program>();

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
	options.AddPolicy(myAllowSpecificOrigins,
		policy =>
		{
			policy
				.WithOrigins("http://localhost:4200")
				.AllowAnyHeader()
				.AllowAnyMethod();
		});
});

builder.Services.AddScoped<IAuthenticatedUser, AuthenticatedUser>();

builder.Services.AddServiceConfigs(appLogger, builder);

builder.Services.AddFastEndpoints()
	.SwaggerDocument(o => { o.ShortSchemaNames = true; });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage();
}
else
{
	app.UseDefaultExceptionHandler();
	app.UseHsts();
}

app.UseCors(myAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseFastEndpoints(c => c.Endpoints.Configurator = ep =>
	{
		ep.PreProcessor<AuthenticatedUserPreProcessor>(Order.Before);
	})
	.UseSwaggerGen();

app.Run();