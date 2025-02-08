using Ardalis.GuardClauses;
using Core.StoryAggregate;
using Shared.Database;

namespace Core.AuthorAggregate;

public class Author : EntityBase<Author, AuthorId>, IAggregateRoot
{
	private readonly List<StoryId> _storyIds = [];

	public Author(string name, string email)
	{
		Guard.Against.NullOrWhiteSpace(name);
		Guard.Against.NullOrWhiteSpace(email);

		Name = name;
		Email = email;
	}

	public string Email { get; init; }

	public string Name { get; init; }

	public IEnumerable<StoryId> StoryIds => _storyIds.AsReadOnly();

	public void AddStory(StoryId storyId)
	{
		Guard.Against.Null(storyId);

		_storyIds.Add(storyId);
	}
}