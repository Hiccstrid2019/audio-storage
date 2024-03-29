using System;
using System.Text;
using AudioStorage.Data;
using AudioStorage.Options;
using AudioStorage.Services;
using AudioStorage.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Minio;

namespace AudioStorage
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "AudioStorage", Version = "v1"});
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\""
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme()
                        {
                            Reference = new OpenApiReference()
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            string connString;
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production")
            {
                var dbhost = Configuration["DB_HOST"];
                var dbport = Configuration["DB_PORT"];
                var dbuser = Configuration["DB_USER"];
                var dbpassword = Configuration["DB_PASSWORD"];
                var dbname = Configuration["DB_NAME"];
                connString = $"server={dbhost};port={dbport};uid={dbuser};pwd={dbpassword};database={dbname}";
            }
            else
            {
                connString = Configuration.GetConnectionString("MySqlConnection");
            }
            var severVersion = new MySqlServerVersion(new Version(8, 0, 32));
            services.AddDbContext<AppDbContext>(options => options.UseMySql(connString, severVersion));
            services.Configure<JwtSettings>(Configuration.GetSection(nameof(JwtSettings)));
            services.Configure<MinioConfig>(Configuration.GetSection("MinIOSettings"));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(Configuration.GetValue<string>("JwtSettings:SecretKey")))
                    };
                });
            
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddSingleton<IAuthService, AuthService>();
            services.AddScoped<IFileAppService, MinIoService>();
            services.AddScoped<IAudioService, AudioService>();
            services.AddScoped<IProjectService, ProjectService>();

            var minioConfig = Configuration.GetSection("MinIOSettings");
            services.AddScoped<MinioClient>(x => new MinioClient()
                .WithEndpoint(minioConfig["Host"] + ":" + minioConfig["Port"])
                .WithCredentials(minioConfig["AccessKey"], minioConfig["SecretKey"])
                .Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AudioStorage v1"));
            }

            app.UseHttpsRedirection();

            app.UseCors(x => x
                .WithOrigins(Configuration["AllowedHost"])
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod());
            
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}