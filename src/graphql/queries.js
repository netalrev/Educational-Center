/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTest = /* GraphQL */ `
  query GetTest($id: ID!) {
    getTest(id: $id) {
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
export const listTests = /* GraphQL */ `
  query ListTests(
    $filter: ModelTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        filePath
        like
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPendingActivities = /* GraphQL */ `
  query GetPendingActivities($id: ID!) {
    getPendingActivities(id: $id) {
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
export const listPendingActivitiess = /* GraphQL */ `
  query ListPendingActivitiess(
    $filter: ModelPendingActivitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPendingActivitiess(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getApprovedActivities = /* GraphQL */ `
  query GetApprovedActivities($id: ID!) {
    getApprovedActivities(id: $id) {
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
export const listApprovedActivitiess = /* GraphQL */ `
  query ListApprovedActivitiess(
    $filter: ModelApprovedActivitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApprovedActivitiess(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
