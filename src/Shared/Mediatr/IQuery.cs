using MediatR;

namespace Shared.Mediatr;

public interface IQuery<out TResponse> : IRequest<TResponse>
{
}