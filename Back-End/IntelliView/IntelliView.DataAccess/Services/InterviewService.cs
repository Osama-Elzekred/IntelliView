﻿using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services
{
    public class InterviewService : IInterviewService
    {
        private readonly Dictionary<string, List<string>> _interviewSessions;
        public InterviewService()
        {
            _interviewSessions = new Dictionary<string, List<string>>();
        }
        public string GetNextQuestion(string sessionId)
        {
            if (_interviewSessions.ContainsKey(sessionId))
            {
                var sessionQuestions = _interviewSessions[sessionId];
                
                if (sessionQuestions.Count > 0)
                {
                    
                    var nextQuestion = sessionQuestions[0];
                    sessionQuestions.RemoveAt(0);
                    return nextQuestion;
                }
                else
                {
                    return "No more questions available.";
                }
            }
            else
            {
                return "Invalid session ID.";
            }
        }

        public string ProcessAnswer(InterviewAnswerDto answerDto)
        {
            if (_interviewSessions.ContainsKey(answerDto.SessionId))
            {
                // Here you can implement logic to process the answer,
                // such as saving it to a database or performing validation.
                // For this example, let's just return the next question.

                return GetNextQuestion(answerDto.SessionId);
            }
            else
            {
                return "Invalid session ID.";
            }
        }

        public string StartInterview()
        {
            var sessionId = Guid.NewGuid().ToString();

            var question = new List<string> { };

            _interviewSessions[sessionId] = question;

            return sessionId;
        }
    }
}