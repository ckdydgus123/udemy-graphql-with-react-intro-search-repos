import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import client from './client'
import { ME, SEARCH_REPOSITORY } from './graphql'

const VAIABLS = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア"
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = VAIABLS
  }

  render() {
    const { query, first, last, before, after } = this.state

    return (
      <ApolloProvider client={client}>
        <Query query={ME}>
          {
            ({ loading, error, data }) => {
              if(loading) return 'Loading...'
              if(error) return `Error...!! ${error.message}`

              return <div>{data.user.avatarUrl}</div>
            }
          }
        </Query>
        <br/>
        <Query query={SEARCH_REPOSITORY} variables ={{query, first, last, before, after}}>
          {
            ({ loading, error, data }) => {
              if(loading) return 'Loading...'
              if(error) return `Error...!! ${error.message}`

              console.log({data})
              return <div></div>
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
}

export default App