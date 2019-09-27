import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'

import validation from './validation'

axios.defaults.headers.common['Authorization'] = token

export default () => {
  let router = Router()

  /** GET /health-check - Check service health */
  router.get('/health-check', (req, res) => res.send('OK'))

  // The following is an example request.response using axios and the
  // express res.json() function
  /** GET /api/rate_limit - Get github rate limit for your token */
  router.get('/rate', (req, res) => {
    axios
      .get(`http://api.github.com/rate_limit`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => res.json(data))
  })

  /** GET /api/user/:username - Get user */
  router.get('/user/:username', validate(validation.user), (req, res) => {
    // console.log('This is the username:' + req.params.username)

    /*
      TODO
      Fetch data for user specified in path variable
      parse/map data to appropriate structure and return as JSON object
    */

    const getUser = () => {
      return axios.get(`https://api.github.com/users/${req.params.username}`)
    }

    const getUserRepos = () => {
      return axios.get(
        `https://api.github.com/users/${req.params.username}/repos`
      )
    }

    const getLogin = userRes => {
      return userRes.data.login
    }
    const getName = userRes => {
      return userRes.data.name
    }
    const getLocation = userRes => {
      return userRes.data.location
    }
    const getEmail = userRes => {
      return userRes.data.email
    }
    const getBio = userRes => {
      return userRes.data.bio
    }
    const getAvatarURL = userRes => {
      return userRes.data.avatar_url
    }
    const getFollowers = userRes => {
      return userRes.data.followers
    }
    const getFollowing = userRes => {
      return userRes.data.following
    }
    const getPublicRepos = userRes => {
      return userRes.data.public_repos
    }
    const getStars = reposRes => {
      let totalStars = 0
      for (let i = 0; i < reposRes.data.length; ++i) {
        totalStars += reposRes.data[i].stargazers_count
      }
      return totalStars
    }
    const highestStarredRepo = reposRes => {
      let highestStarCount = 0
      for (let i = 0; i < reposRes.data.length; ++i) {
        if (reposRes.data[i].stargazers_count > highestStarCount) {
          highestStarCount = reposRes.data[i].stargazers_count
        }
      }
      return highestStarCount
    }

    const getFavoriteLanguage = reposRes => {
      let repoLanguages = []
      let eachLanguage = []
      for (let i = 0; i < reposRes.data.length; ++i) {
        repoLanguages.push(reposRes.data[i].language)
      }
      for (let j = 0; j < repoLanguages.length; ++j) {
        if (!eachLanguage.includes(repoLanguages[j])) {
          eachLanguage.push(repoLanguages[j])
        }
      }
      let tempCount = 0
      let finalCount = 0
      let favorite

      for (let k = 0; k < eachLanguage.length; ++k) {
        for (let m = 0; m < repoLanguages.length; ++m) {
          if (eachLanguage[k] === repoLanguages[m]) {
            ++tempCount
          }
        }
        if (tempCount > finalCount) {
          finalCount = tempCount
          favorite = eachLanguage[k]
          tempCount = 0
        }
      }
      return favorite
    }

    const getPerfectRepos = reposRes => {
      let numPerfectProjects = 0
      for (let i = 0; i < reposRes.data.length; ++i) {
        if (reposRes.data[i].open_issues_count === 0) {
          ++numPerfectProjects
        }
      }
      return numPerfectProjects
    }

    const getNumForks = reposRes => {
      let numForks = 0
      for (let i = 0; i < reposRes.data.length; ++i) {
        if (reposRes.data[i].fork === true) {
          ++numForks
        }
      }
      return numForks
    }

    const getTitles = (userRes, reposRes) => {
      const numPublicRepos = JSON.stringify(userRes.data.public_repos)
      const numForks = getNumForks(reposRes)

      let titlesArr = []
      if (numForks >= numPublicRepos / 2) {
        titlesArr.push('Forker')
      }

      const oneTrickPony = reposRes => {
        let repoLanguages = []
        let eachLanguage = []
        for (let i = 0; i < reposRes.data.length; ++i) {
          repoLanguages.push(reposRes.data[i].language)
        }
        for (let j = 0; j < repoLanguages.length; ++j) {
          if (!eachLanguage.includes(repoLanguages[j])) {
            eachLanguage.push(repoLanguages[j])
          }
        }

        if (eachLanguage.length > 0 && eachLanguage.length === 1) {
          titlesArr.push('One-Trick Pony')
        }
      }

      const jackOfAllTrades = reposRes => {
        let repoLanguages = []
        let eachLanguage = []
        for (let i = 0; i < reposRes.data.length; ++i) {
          repoLanguages.push(reposRes.data[i].language)
        }
        for (let j = 0; j < repoLanguages.length; ++j) {
          if (!eachLanguage.includes(repoLanguages[j])) {
            eachLanguage.push(repoLanguages[j])
          }
        }
        if (eachLanguage.length > 10) {
          titlesArr.push('Jack of all Trades')
        }
      }

      const stalker = userRes => {
        if (userRes.data.following >= 2 * userRes.data.followers) {
          titlesArr.push('Stalker')
        }
      }

      const mrPopular = userRes => {
        if (userRes.data.followers >= 2 * userRes.data.following) {
          titlesArr.push('Mr. Popular')
        }
      }

      const spreaderOfKnowledge = reposRes => {
        for (let i = 0; i < reposRes.data.length; ++i) {
          if (reposRes.data[i].license !== null) {
            titlesArr.push('Spreader of Knowledge')
            break
          }
        }
      }

      spreaderOfKnowledge(reposRes)
      mrPopular(userRes)
      stalker(userRes)
      jackOfAllTrades(reposRes)
      oneTrickPony(reposRes)
      return titlesArr
    }

    axios
      .all([getUser(), getUserRepos()])
      .then(
        axios.spread((userRes, reposRes) => {
          res.json({
            username: getLogin(userRes),
            name: getName(userRes),
            location: getLocation(userRes),
            bio: getBio(userRes),
            'avatar-url': getAvatarURL(userRes),
            titles: getTitles(userRes, reposRes),
            'favorite-language': getFavoriteLanguage(reposRes),
            'public-repos': getPublicRepos(userRes),
            'total-stars': getStars(reposRes),
            'highest-starred': highestStarredRepo(reposRes),
            'perfect-repos': getPerfectRepos(reposRes),
            followers: getFollowers(userRes),
            following: getFollowing(userRes),
            email: getEmail(userRes)
          })
        })
      )
      .catch(error => console.log(error))
  })

  /** GET /api/users? - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    console.log(`Query: `, req.query)
    /*
      TODO
      Fetch data for users specified in query
      parse/map data to appropriate structure and return as a JSON array
    */

    // const getUser = (index, propName) => {
    //   return axios.get(
    //     `https://api.github.com/users/${req.query[propName][index]}`
    //   )
    // }

    // const getUserRepos = (index, propName) => {
    //   return axios.get(
    //     `https://api.github.com/users/${req.query[propName][index]}/repos`
    //   )
    // }

    // let userArr = []

    // for (let propName in req.query) {
    //   if (req.query.hasOwnProperty(propName)) {
    //     console.log(propName, req.query[propName][1])
    //   }
    // }

    // for (let propName in req.query) {
    //   console.log(`Final Array: `, userArr, propName)
    //   axios
    //     .all([getUser(i, propName), getUserRepos(i, propName)])
    //     .then(
    //       console.log(`I reached here!`),
    //       axios.spread((userRes, reposRes) => {
    //         userArr.push(
    //           res.json({
    //             username: getLogin(userRes),
    //             name: getName(userRes),
    //             location: getLocation(userRes),
    //             bio: getBio(userRes),
    //             'avatar-url': getAvatarURL(userRes),
    //             titles: getTitles(userRes, reposRes),
    //             'favorite-language': getFavoriteLanguage(reposRes),
    //             'public-repos': getPublicRepos(userRes),
    //             'total-stars': getStars(reposRes),
    //             'highest-starred': highestStarredRepo(reposRes),
    //             'perfect-repos': getPerfectRepos(reposRes),
    //             followers: getFollowers(userRes),
    //             following: getFollowing(userRes),
    //             email: getEmail(userRes)
    //           })
    //         )
    //       })
    //     )
    //     .catch(error => console.log(error))
    // }

    // console.log('made it here')
    // let q = '?username='
    // axios
    //   .get(
    //     `https://api.github.com/users${q}${req[0].params.username}&username=${
    //       req[1].params.username
    //     }`
    //   )
    //   .then(([data]) => res.json(data))

    // console.log('made it out')

    // console.log(data)

    // console.log(`hmm: `, userArr)
  })

  return router
}
