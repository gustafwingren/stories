namespace Shared.Database;

public abstract class EntityBase<T, TId> where T : EntityBase<T, TId>
{
	public TId Id { get; set; } = default!;
}