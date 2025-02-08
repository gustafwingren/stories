using Ardalis.GuardClauses;
using Shared.Database;

namespace Core.StoryAggregate;

public class Page : ValueObject
{
	public Page(int pageNr, string content)
	{
		Guard.Against.Negative(pageNr);
		Guard.Against.NullOrWhiteSpace(content);

		PageNr = pageNr;
		Content = content;
	}

	public int PageNr { get; init; }
	public string Content { get; init; }

	protected override IEnumerable<object?> GetEqualityComponents()
	{
		return [PageNr, Content];
	}
}