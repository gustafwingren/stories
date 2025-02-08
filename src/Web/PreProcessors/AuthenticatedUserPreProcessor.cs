using System.Security.Claims;
using Core.AuthorAggregate;
using FastEndpoints;
using Microsoft.Identity.Web;
using Web.Auth;

namespace Web.PreProcessors;

public class AuthenticatedUserPreProcessor : IGlobalPreProcessor
{
	public Task PreProcessAsync(IPreProcessorContext context, CancellationToken ct)
	{
		var user = context.HttpContext.Resolve<IAuthenticatedUser>();

		user.Identity = context.HttpContext.User.Identity as ClaimsIdentity;
		user.IsAuthenticated = context.HttpContext.User.Identity?.IsAuthenticated;
		user.Id = AuthorId.Parse(context.HttpContext.User.FindFirstValue(ClaimConstants.ObjectId) ?? string.Empty);
		return Task.CompletedTask;
	}
}