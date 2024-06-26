﻿using IntelliView.DataAccess.Repository.IRepository.IInterviewRepo;
using IntelliView.DataAccess.Repository.IRepository.IJobRepos;
using IntelliView.DataAccess.Repository.IRepository.InterviewRepos;
using IntelliView.DataAccess.Repository.IRepository.IUserRepo;
namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICompanyUserRepo CompanyUsers { get; }
        IIndividualUserRepo IndividualUsers { get; }
        IInterviewQuestionRepo InterviewQuestions { get; }
        IInterviewSessionRepo InterviewSessions { get; }
        IJobApplicationsRepo JobApplications { get; }
        IJobRepo Jobs { get; }
        IJobQuestionRepo JobQuestions { get; }
        IInterestedTopicRepo InterestedTopics { get; }
        IInterviewMockRepo InterviewMocks { get; }
        IInterviewMockTopicRepo InterviewMockTopics { get; }
        IMockVideoAnswerRepo MockVideoAnswers { get; }
        IUserMockSessionRepo UserMockSessions { get; }

        Task SaveAsync();
    }
}
