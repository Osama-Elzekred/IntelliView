using System.Linq.Expressions;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(params object[] keyValues);
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, params Expression<Func<T, object>>[] properties);
        Task<T?> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] properties);
        Task AddAsync(T entity);
        Task<bool> DeleteByIdAsync(int id);
        Task<bool> ExistsAsync(Expression<Func<T, bool>> filter);
        Task RemoveRangeAsync(IEnumerable<T> entities);
        Task RemoveAsync(T entities);
        IQueryable<T> GetAsQueryable();
    }
}
