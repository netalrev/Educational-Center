/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
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
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getActivities = /* GraphQL */ `
  query GetActivities($id: ID!) {
    getActivities(id: $id) {
      id
      title
      description
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listActivitiess = /* GraphQL */ `
  query ListActivitiess(
    $filter: ModelActivitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivitiess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
