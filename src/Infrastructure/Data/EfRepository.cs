using System;
using Ardalis.Specification.EntityFrameworkCore;
using Shared.Database;

namespace Infrastructure.Data;

public class EfRepository<T>(AppDbContext dbContext) : RepositoryBase<T>(dbContext), IReadRepository<T>, IRepository<T> where T : class, IAggregateRoot
{
}
