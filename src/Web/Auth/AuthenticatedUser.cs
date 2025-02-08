using System.Security.Claims;
using Core.AuthorAggregate;

namespace Web.Auth;

public interface IAuthenticatedUser
{
	public ClaimsIdentity? Identity { get; set; }

	public AuthorId? Id { get; set; }
	bool? IsAuthenticated { get; set; }
}

public class AuthenticatedUser : IAuthenticatedUser
{
	public ClaimsIdentity? Identity { get; set; }
	public AuthorId? Id { get; set; }
	public bool? IsAuthenticated { get; set; }
}