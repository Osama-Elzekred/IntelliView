using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace IntelliView.DataAccess.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationDbContext _db;
        internal DbSet<T> _dbSet;
        public Repository(ApplicationDbContext db)
        {
            _db = db;
            this._dbSet = _db.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, params Expression<Func<T, object>>[] properties)
        {
            IQueryable<T> query = _dbSet;

            if (properties != null)
            {
                query = properties.Aggregate(query, (current, property) => current.Include(property));
            }

            // Apply the filter and use ToListAsync directly
            if (filter is null)
            {
                return await query.AsNoTracking().ToListAsync();
            }
            return await _dbSet.Where(filter).AsNoTracking().ToListAsync();
        }
        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public Task<T?> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] properties)
        {
            IQueryable<T> query = _dbSet;

            if (properties != null)
            {
                query = properties.Aggregate(query, (current, property) => current.Include(property));
            }

            // Apply the filter and use FirstOrDefaultAsync directly
            return query.FirstOrDefaultAsync(filter);
        }

        public Task AddAsync(T entity)
        {
            return Task.Run(() => _dbSet.AddAsync(entity));
        }

        public async Task<bool> DeleteByIdAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity is not null)
            {
                _dbSet.Remove(entity);
                return true;
            }
            return false;
        }

        public Task<bool> ExistsAsync(Expression<Func<T, bool>> filter)
        {
            return _dbSet.AnyAsync(filter);

        }

        public Task RemoveRangeAsync(IEnumerable<T> entities)
        {
            return Task.Run(() => _dbSet.RemoveRange(entities));
        }

        public Task RemoveAsync(T entities)
        {
            return Task.Run(() => _dbSet.Remove(entities));
        }
    }
}
