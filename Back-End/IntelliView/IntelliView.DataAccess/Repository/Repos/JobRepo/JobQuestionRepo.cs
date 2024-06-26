﻿using AutoMapper;
using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Repository.IRepository.IJobRepos;
using IntelliView.Models.Models;
using IntelliView.Models.Models.job;
using Microsoft.EntityFrameworkCore;
namespace IntelliView.DataAccess.Repository.Repos.JobRepos
{
    public class JobQuestionRepo : Repository<JobQuestion>, IJobQuestionRepo
    {
        private ApplicationDbContext _db;
        public JobQuestionRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<JobQuestion> Update(JobQuestion jobquestion)
        {
            IMapper _mapper = new MapperConfiguration(cfg => cfg.CreateMap<JobQuestion, JobQuestion>()).CreateMapper();

            JobQuestion? jp = await _db.JobQuestions.FindAsync(jobquestion.Id);
            if (jp is null)
            {
                throw new InvalidOperationException("jop not found.");
            }
            _mapper.Map(jobquestion, jp);
            return jp;
        }
        //public async Task<Job> UpdateAsync(AddJopDTO jopDTO)
        //{


        //    Job? job = await _db.jops.FindAsync(jopDTO.Id);
        //    if (job is null)
        //    {
        //        throw new InvalidOperationException("job not found.");
        //    }
        //    return job;
        //}


        // Constructor and other methods...
        //public async Task<IEnumerable<CustQuestion>> GetJobQuestionsAsync(int jobId)
        //{
        //    var job = await _db.Jobs.Include(j => j.JobQuestions).FirstOrDefaultAsync(j => j.Id == jobId);

        //    if (job == null)
        //    {
        //        // Handle job not found
        //        return Enumerable.Empty<CustQuestion>();
        //    }

        //    if (job.JobQuestions == null)
        //    {
        //        // Handle null JobQuestions collection
        //        return Enumerable.Empty<CustQuestion>();
        //    }

        //    var questions = job.JobQuestions.ToList();

        //    return questions;
        //}
        public async Task<IEnumerable<(int, string)>> GetJobQuestionsAsync(int jobId)
        {
            var job = await _db.Jobs
                .Include(j => j.JobQuestions)
                .FirstOrDefaultAsync(j => j.Id == jobId);

            if (job == null || job.JobQuestions == null)
            {
                return Enumerable.Empty<(int, string)>();
            }

            var questions = job.JobQuestions
                .Select(q => (q.Id, q.Question))
                .ToList();

            return questions;
        }

        public async Task AddQuestionToJob(int jobId, CustQuestion question)
        {
            var job = await _db.Jobs.FindAsync(jobId);

            if (job == null)
            {
                // Handle job not found
                return;
            }

            // Associate the question with the job
            job.JobQuestions ??= new List<CustQuestion>();
            job.JobQuestions.Add(question);

            // Save changes to the database
            //await _db.SaveChangesAsync();
        }

        public async Task RemoveQuestionFromJob(int jobId, int questionId)
        {
            var job = await _db.Jobs
                .Include(j => j.JobQuestions)
                .FirstOrDefaultAsync(j => j.Id == jobId);
            if (job == null || job.JobQuestions == null)
            {
                // Handle job not found or null JobQuestions collection
                return;
            }
            var question = job.JobQuestions.FirstOrDefault(q => q.Id == questionId);
            if (question == null)
            {
                // Handle question not found
                return;
            }
            job.JobQuestions.Remove(question);
            // Save changes to the database
            //await _db.SaveChangesAsync();
        }
    }
}
