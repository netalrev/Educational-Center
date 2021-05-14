/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPendingUser = /* GraphQL */ `
  query GetPendingUser($id: ID!) {
    getPendingUser(id: $id) {
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
export const listPendingUsers = /* GraphQL */ `
  query ListPendingUsers(
    $filter: ModelPendingUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPendingUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone_number
        activity_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getApprovedUser = /* GraphQL */ `
  query GetApprovedUser($id: ID!) {
    getApprovedUser(id: $id) {
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
export const listApprovedUsers = /* GraphQL */ `
  query ListApprovedUsers(
    $filter: ModelApprovedUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApprovedUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone_number
        activity_id
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
      img
      zoom
      phone_number
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
        img
        zoom
        phone_number
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
      img
      zoom
      phone_number
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
        img
        zoom
        phone_number
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
