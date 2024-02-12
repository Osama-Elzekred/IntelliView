﻿using IntelliView.DataAccess.Repository.IRepository.InterviewRepo;
using IntelliView.DataAccess.Repository.IRepository.IUserRepo;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICompanyUserRepo CompanyUsers { get; }
        IIndividualUserRepo IndividualUsers { get; }
        IInterviewApplicationRepo InterviewApplications { get; }
        IInterviewQuestionRepo InterviewQuestions { get; }
        IInterviewSessionRepo InterviewSessions { get; }
        IJobApplicationsRepo JobApplications { get; }
        IJobRepo Jobs { get; }
        IJobQuestionRepo JobQuestions { get; }
        IInterestedTopicRepo InterestedTopics { get; }
        Task SaveAsync();
    }
}
