import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import client from './client'
import { ME, SEARCH_REPOSITORY } from './graphql'

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア"
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      ...DEFAULT_STATE,
      query: event.target.value
    })
  }

  render() {
    const { query, first, last, before, after } = this.state
    console.log({query})

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

        <form>
          <input value={query} onChange={this.handleChange} />
        </form>
        
        <Query query={SEARCH_REPOSITORY} variables ={{query, first, last, before, after}}>
          {
            ({ loading, error, data }) => {
              if(loading) return 'Loading...'
              if(error) return `Error...!! ${error.message}`

              const search = data.search
              const repositoryCount = search.repositoryCount
              const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories'
              const title = `GitHub Repositorys Search Reulst - ${repositoryCount} ${repositoryUnit}`

              return <h2>{title}</h2>
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
}

export default App