/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPendingUser = /* GraphQL */ `
  mutation CreatePendingUser(
    $input: CreatePendingUserInput!
    $condition: ModelPendingUserConditionInput
  ) {
    createPendingUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const updatePendingUser = /* GraphQL */ `
  mutation UpdatePendingUser(
    $input: UpdatePendingUserInput!
    $condition: ModelPendingUserConditionInput
  ) {
    updatePendingUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const deletePendingUser = /* GraphQL */ `
  mutation DeletePendingUser(
    $input: DeletePendingUserInput!
    $condition: ModelPendingUserConditionInput
  ) {
    deletePendingUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const createApprovedUser = /* GraphQL */ `
  mutation CreateApprovedUser(
    $input: CreateApprovedUserInput!
    $condition: ModelApprovedUserConditionInput
  ) {
    createApprovedUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const updateApprovedUser = /* GraphQL */ `
  mutation UpdateApprovedUser(
    $input: UpdateApprovedUserInput!
    $condition: ModelApprovedUserConditionInput
  ) {
    updateApprovedUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteApprovedUser = /* GraphQL */ `
  mutation DeleteApprovedUser(
    $input: DeleteApprovedUserInput!
    $condition: ModelApprovedUserConditionInput
  ) {
    deleteApprovedUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const createPendingActivities = /* GraphQL */ `
  mutation CreatePendingActivities(
    $input: CreatePendingActivitiesInput!
    $condition: ModelPendingActivitiesConditionInput
  ) {
    createPendingActivities(input: $input, condition: $condition) {
      id
      title
      description
      activityCount
      dates
      owner
      img
      zoom
      phone_number
      email
      createdAt
      updatedAt
    }
  }
`;
export const updatePendingActivities = /* GraphQL */ `
  mutation UpdatePendingActivities(
    $input: UpdatePendingActivitiesInput!
    $condition: ModelPendingActivitiesConditionInput
  ) {
    updatePendingActivities(input: $input, condition: $condition) {
      id
      title
      description
      activityCount
      dates
      owner
      img
      zoom
      phone_number
      email
      createdAt
      updatedAt
    }
  }
`;
export const deletePendingActivities = /* GraphQL */ `
  mutation DeletePendingActivities(
    $input: DeletePendingActivitiesInput!
    $condition: ModelPendingActivitiesConditionInput
  ) {
    deletePendingActivities(input: $input, condition: $condition) {
      id
      title
      description
      activityCount
      dates
      owner
      img
      zoom
      phone_number
      email
      createdAt
      updatedAt
    }
  }
`;
export const createApprovedActivities = /* GraphQL */ `
  mutation CreateApprovedActivities(
    $input: CreateApprovedActivitiesInput!
    $condition: ModelApprovedActivitiesConditionInput
  ) {
    createApprovedActivities(input: $input, condition: $condition) {
      id
      title
      description
      activityCount
      dates
      owner
      img
      zoom
      phone_number
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateApprovedActivities = /* GraphQL */ `
  mutation UpdateApprovedActivities(
    $input: UpdateApprovedActivitiesInput!
    $condition: ModelApprovedActivitiesConditionInput
  ) {
    updateApprovedActivities(input: $input, condition: $condition) {
      id
      title
      description
      activityCount
      dates
      owner
      img
      zoom
      phone_number
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteApprovedActivities = /* GraphQL */ `
  mutation DeleteApprovedActivities(
    $input: DeleteApprovedActivitiesInput!
    $condition: ModelApprovedActivitiesConditionInput
  ) {
    deleteApprovedActivities(input: $input, condition: $condition) {
      id
      title
      description
      activityCount
      dates
      owner
      img
      zoom
      phone_number
      email
      createdAt
      updatedAt
    }
  }
`;
export const createActivityFeedback = /* GraphQL */ `
  mutation CreateActivityFeedback(
    $input: CreateActivityFeedbackInput!
    $condition: ModelActivityFeedbackConditionInput
  ) {
    createActivityFeedback(input: $input, condition: $condition) {
      id
      title
      activityCount
      date
      owner
      img
      zoom
      phone_number
      email
      form
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const updateActivityFeedback = /* GraphQL */ `
  mutation UpdateActivityFeedback(
    $input: UpdateActivityFeedbackInput!
    $condition: ModelActivityFeedbackConditionInput
  ) {
    updateActivityFeedback(input: $input, condition: $condition) {
      id
      title
      activityCount
      date
      owner
      img
      zoom
      phone_number
      email
      form
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteActivityFeedback = /* GraphQL */ `
  mutation DeleteActivityFeedback(
    $input: DeleteActivityFeedbackInput!
    $condition: ModelActivityFeedbackConditionInput
  ) {
    deleteActivityFeedback(input: $input, condition: $condition) {
      id
      title
      activityCount
      date
      owner
      img
      zoom
      phone_number
      email
      form
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const createSubmitedActivityFeedback = /* GraphQL */ `
  mutation CreateSubmitedActivityFeedback(
    $input: CreateSubmitedActivityFeedbackInput!
    $condition: ModelSubmitedActivityFeedbackConditionInput
  ) {
    createSubmitedActivityFeedback(input: $input, condition: $condition) {
      id
      title
      activityCount
      date
      owner
      img
      zoom
      phone_number
      email
      form
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const updateSubmitedActivityFeedback = /* GraphQL */ `
  mutation UpdateSubmitedActivityFeedback(
    $input: UpdateSubmitedActivityFeedbackInput!
    $condition: ModelSubmitedActivityFeedbackConditionInput
  ) {
    updateSubmitedActivityFeedback(input: $input, condition: $condition) {
      id
      title
      activityCount
      date
      owner
      img
      zoom
      phone_number
      email
      form
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubmitedActivityFeedback = /* GraphQL */ `
  mutation DeleteSubmitedActivityFeedback(
    $input: DeleteSubmitedActivityFeedbackInput!
    $condition: ModelSubmitedActivityFeedbackConditionInput
  ) {
    deleteSubmitedActivityFeedback(input: $input, condition: $condition) {
      id
      title
      activityCount
      date
      owner
      img
      zoom
      phone_number
      email
      form
      activity_id
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      score
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      score
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      score
      createdAt
      updatedAt
    }
  }
`;
