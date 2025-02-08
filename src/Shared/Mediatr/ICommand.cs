using MediatR;

namespace Shared.Mediatr;

public interface ICommand<out TResponse> : IRequest<TResponse>
{
}