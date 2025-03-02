import { CATEGORY_URL, LEADERBOARD_URL, QUESTION_URL, RESULT_URL} from "../../constants";
import { apiSlice } from "../apiSlice";

export const questionApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        getQuestions : builder.query({
            query : ()=>({
                url : `${QUESTION_URL}`,
            }),
        }),
        getQuestionById: builder.query({
            query: (questionId) => `${QUESTION_URL}/${questionId}`,
           
          }),
          
          
          createQuestion : builder.mutation({
            query : (questionData)=>({
                url : `${QUESTION_URL}`,
                method : "POST",
                body : questionData
            }),
          }),
          updateQuestion : builder.mutation({
            query : ({questionId,formData})=>({
                url : `${QUESTION_URL}/${questionId}`,
                method : "PUT",
                body : formData
            })
          }),
        
          deleteQuestion : builder.mutation({
            query :(questionId)=>({
                url : `${QUESTION_URL}/${questionId}`,
                method : "DELETE"
            }),
          }),
          questionByCategory : builder.query({
            query: (category)=>({
                url : `${CATEGORY_URL}/${category}`
            })
          }),
          categories: builder.query({
            query: ()=>({
                url: `${CATEGORY_URL}`
            })
          }),
          saveResults: builder.mutation({
            query: (resultData)=>({
              url: `${RESULT_URL}`,
              method: "POST",
              body: resultData
            })
          }),
          getResults: builder.query({
            query: ()=>({
              url: `${RESULT_URL}`
            })
          }),
          leaderBoard: builder.query({
            query: ()=>({
              url: `${LEADERBOARD_URL}`
            })
          })
      
    })
})

export const {useCreateQuestionMutation,useDeleteQuestionMutation,useGetQuestionByIdQuery,useUpdateQuestionMutation,useGetQuestionsQuery,useQuestionByCategoryQuery, useCategoriesQuery, useGetResultsQuery,useSaveResultsMutation,useLeaderBoardQuery} = questionApiSlice