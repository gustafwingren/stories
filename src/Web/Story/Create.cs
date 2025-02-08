using FastEndpoints;
using Web.Auth;

namespace Web.Story;

public class Create(IAuthenticatedUser user) : Endpoint<EmptyRequest, EmptyResponse>
{
	public override void Configure()
	{
		Post("story/create");
	}

	public override Task HandleAsync(EmptyRequest req, CancellationToken ct)
	{
		var t = user;
		Response = new EmptyResponse();
		return Task.CompletedTask;
	}
}