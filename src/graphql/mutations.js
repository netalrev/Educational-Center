/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSong = /* GraphQL */ `
  mutation CreateSong(
    $input: CreateSongInput!
    $condition: ModelSongConditionInput
  ) {
    createSong(input: $input, condition: $condition) {
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
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $input: UpdateSongInput!
    $condition: ModelSongConditionInput
  ) {
    updateSong(input: $input, condition: $condition) {
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
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $input: DeleteSongInput!
    $condition: ModelSongConditionInput
  ) {
    deleteSong(input: $input, condition: $condition) {
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
export const createActivities = /* GraphQL */ `
  mutation CreateActivities(
    $input: CreateActivitiesInput!
    $condition: ModelActivitiesConditionInput
  ) {
    createActivities(input: $input, condition: $condition) {
      id
      title
      description
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateActivities = /* GraphQL */ `
  mutation UpdateActivities(
    $input: UpdateActivitiesInput!
    $condition: ModelActivitiesConditionInput
  ) {
    updateActivities(input: $input, condition: $condition) {
      id
      title
      description
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteActivities = /* GraphQL */ `
  mutation DeleteActivities(
    $input: DeleteActivitiesInput!
    $condition: ModelActivitiesConditionInput
  ) {
    deleteActivities(input: $input, condition: $condition) {
      id
      title
      description
      owner
      createdAt
      updatedAt
    }
  }
`;
