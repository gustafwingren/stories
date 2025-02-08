using Ardalis.Specification;

namespace Shared.Database;

public interface IRepository<T> : IRepositoryBase<T> where T : class, IAggregateRoot
{
}