// Import the required packages
//==============================

using dotenv.net;
using InteliView.DataAccess.Data;
using IntelliView.API.Infrastructure;
using IntelliView.API.Services;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Repository.Repos;
using IntelliView.DataAccess.Services;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.Models;
using IntelliView.Utility;
using IntelliView.Utility.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

// Set your Cloudinary credentials
//=================================

DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// for database sql server

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureConnection")));

// for database in memory

//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//{
//    // Use In-Memory Database
//    options.UseInMemoryDatabase("InMemoryDatabase");

//    // If you still want to seed data, you can do it here
//    // options.UseInMemoryDatabase("InMemoryDatabaseName").UseSeedData();
//});

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUploadFilesToCloud, UploadFilesToCloud>();
//builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequiredLength = 8;
}).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(o =>
    {
        o.RequireHttpsMetadata = false;
        o.SaveToken = false;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.AddScoped<IVerifyService, VerifyService>();
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<IAiSearchService, AiSearchService>();
builder.Services.AddScoped<HttpClient, HttpClient>();

builder.Services.AddScoped<IJwtToken, JwtToken>();

builder.Services.AddAutoMapper(typeof(Program).Assembly, typeof(IAuthService).Assembly);

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});


builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("UserOrCompany", policy =>
    {
        policy.RequireRole(SD.ROLE_USER, SD.ROLE_COMPANY);
    });
});

//builder.Services.AddIdentityApiEndpoints<IdentityUser>()
//.AddEntityFrameworkStores<ApplicationDbContext>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
//app.MapIdentityApi<IdentityUser>();
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();


//app.UseExceptionHandler();

app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();

app.Run();