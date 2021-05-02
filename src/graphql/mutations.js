/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTest = /* GraphQL */ `
  mutation CreateTest(
    $input: CreateTestInput!
    $condition: ModelTestConditionInput
  ) {
    createTest(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      like
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateTest = /* GraphQL */ `
  mutation UpdateTest(
    $input: UpdateTestInput!
    $condition: ModelTestConditionInput
  ) {
    updateTest(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      like
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteTest = /* GraphQL */ `
  mutation DeleteTest(
    $input: DeleteTestInput!
    $condition: ModelTestConditionInput
  ) {
    deleteTest(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      like
      owner
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
      email
      createdAt
      updatedAt
    }
  }
`;
