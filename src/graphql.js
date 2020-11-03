import gql from 'graphql-tag'

export const ME = gql`
query me {
  user(login:"ckdydgus123") {
    name
    avatarUrl
  }
}
`