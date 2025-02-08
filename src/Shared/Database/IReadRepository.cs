using Ardalis.Specification;

namespace Shared.Database;

public interface IReadRepository<T> : IReadRepositoryBase<T> where T : class, IAggregateRoot
{
}