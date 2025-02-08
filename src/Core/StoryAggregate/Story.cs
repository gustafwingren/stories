using Ardalis.GuardClauses;
using Core.AuthorAggregate;
using Shared.Database;

namespace Core.StoryAggregate;

public class Story : EntityBase<Story, StoryId>, IAggregateRoot
{
	private readonly List<Page> _pages = new();

	public Story(string title, AuthorId authorId)
	{
		Guard.Against.NullOrWhiteSpace(title);
		Guard.Against.Null(authorId);

		Title = title;
		AuthorId = authorId;
	}

	public string Title { get; init; }

	public AuthorId AuthorId { get; init; }

	public IEnumerable<Page> Pages => _pages.AsReadOnly();

	public void AddPage(Page page)
	{
		Guard.Against.Null(page);

		_pages.Add(page);
	}
}