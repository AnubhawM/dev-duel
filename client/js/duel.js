/* eslint-disable no-undef */
/*
  TODO
  Fetch 2 user's github data and display their profiles side by side
  If there is an error in finding user or both users, display appropriate error
  message stating which user(s) doesn't exist

  It is up to the student to choose how to determine a 'winner'
  and displaying their profile/stats comparison in a way that signifies who won.
 */

// import '../../server/routes/index'

$('form').submit(() => {
  const username = $('form input').val()
  console.log(`val: `, username)
  console.log(`examining ${username}`)

  const username2 = $('form input')
    .eq(1)
    .val()
  console.log(`examining ${username2}`)

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(data => {
      console.log(`Got data for ${username}`)
      console.log(data)
      console.log($('.username')[1])
      /*
        TODO
        Inject the data
        Attach the data returned to the DOM
        The data currently hard-coded into the DOM is placeholder data
       */
      $('.username')[0].innerHTML = `${JSON.stringify(data.username).replace(
        /"/g,
        ''
      )}`
      console.log(`${JSON.stringify(data.name)}`)
      if (`${JSON.stringify(data.name)}` !== 'null') {
        $('.full-name')[0].innerHTML = `${JSON.stringify(data.name).replace(
          /"/g,
          ''
        )}`
      } else {
        $('.full-name')[0].innerHTML = 'N/A'
      }

      if (`${JSON.stringify(data.location)}` !== 'null') {
        $('.location')[1].innerHTML = `${JSON.stringify(data.location).replace(
          /"/g,
          ''
        )}`
      } else {
        $('.location')[0].innerHTML = 'N/A'
      }

      if (`${JSON.stringify(data.email)}` !== 'null') {
        $('.email')[0].innerHTML = `${JSON.stringify(data.email).replace(
          /"/g,
          ''
        )}`
      } else {
        $('.email')[0].innerHTML = 'N/A'
      }
      if (`${JSON.stringify(data.bio)}` !== 'null') {
        $('.bio')[0].innerHTML = `${JSON.stringify(data.bio).replace(/"/g, '')}`
      } else {
        $('.bio')[0].innerHTML = 'N/A'
      }

      let a = `${JSON.stringify(data['avatar-url']).replace(/"/g, '')}`
      $('.avatar')[0].src = a

      if (`${JSON.stringify(data.titles.length)}` > 0) {
        $('.titles')[0].innerHTML = `${JSON.stringify(data.titles[0]).replace(
          /"/g,
          ''
        )}`
        for (let i = 1; i < data.titles.length; ++i) {
          $('.titles')[0].innerHTML += `, ${JSON.stringify(
            data.titles[i]
          ).replace(/"/g, '')}`
        }
      } else {
        $('.titles')[0].innerHTML = `N/A`
      }

      if (`${JSON.stringify(data['total-stars'])}` !== 'null') {
        $('.total-stars')[0].innerHTML = `${JSON.stringify(
          data['total-stars']
        ).replace(/"/g, '')}`
      } else {
        $('.total-stars')[0].innerHTML = 'N/A'
      }

      if (`${JSON.stringify(data['public-repos'])}` !== 'null') {
        $('.public-repos')[0].innerHTML = `${JSON.stringify(
          data['public-repos']
        ).replace(/"/g, '')}`
      } else {
        $('.public-repos')[0].innerHTML = 'N/A'
      }

      if (`${JSON.stringify(data['favorite-language'])}` !== 'null') {
        $('.favorite-language')[0].innerHTML = `${JSON.stringify(
          data['favorite-language']
        ).replace(/"/g, '')}`
      } else {
        $('.favorite-language')[0].innerHTML = 'N/A'
      }
      console.log(`${JSON.stringify(data['highest-starred'])}`)
      if (`${JSON.stringify(data['highest-starred'])}` !== 'null') {
        $('.highest-starred')[0].innerHTML = `${JSON.stringify(
          data['highest-starred']
        ).replace(/"/g, '')}`
      } else {
        $('.most-starred')[0].innerHTML = 'N/A'
      }

      if (`${JSON.stringify(data['perfect-repos'])}` !== 'null') {
        $('.perfect-repos')[0].innerHTML = `${JSON.stringify(
          data['perfect-repos']
        ).replace(/"/g, '')}`
      } else {
        $('.perfect-repos')[0].innerHTML = 'N/A'
      }

      if (`${JSON.stringify(data['followers'])}` !== 'null') {
        $('.followers')[0].innerHTML = `${JSON.stringify(
          data.followers
        ).replace(/"/g, '')}`
      } else {
        $('.followers')[0].innerHTML = 'N/A'
      }

      if (`${JSON.stringify(data['following'])}` !== 'null') {
        $('.following')[0].innerHTML = `${JSON.stringify(
          data.following
        ).replace(/"/g, '')}`
      } else {
        $('.following')[0].innerHTML = 'N/A'
      }

      $('.user-results').removeClass('hide') // Display '.user-results' element
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      /*
        TODO
        Inject the error into the span in inspect.html error section
        If there is an error finding the user, instead toggle the display of the '.user-error' element
        and populate it's inner span '.error' element with an appropriate error message
      */
    })

  fetch(`${USER_URL}/${username2}`)
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(data => {
      console.log(`Got data for ${username2}`)
      console.log(data)
      console.log($('username')[1])
    })

  // const username2 = $('form input')
  //   .eq(1)
  //   .val()
  // console.log(`examining ${username2}`)

  // // Fetch data for given user
  // // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  // fetch(`${USER_URL}/${username2}`)
  //   .then(response => response.json()) // Returns parsed json data from response body as promise
  //   .then(data => {
  //     console.log(`Got data for ${username2}`)
  //     console.log(data)
  //     console.log($('username'))
  //     /*
  //       TODO
  //       Inject the data
  //       Attach the data returned to the DOM
  //       The data currently hard-coded into the DOM is placeholder data
  //      */
  //     $('username')[1].innerHTML = `${JSON.stringify(data.username).replace(
  //       /"/g,
  //       ''
  //     )}`
  //     console.log(`${JSON.stringify(data.name)}`)
  //     if (`${JSON.stringify(data.name)}` !== 'null') {
  //       $('.full-name')[1].innerHTML = `${JSON.stringify(data.name).replace(
  //         /"/g,
  //         ''
  //       )}`
  //     } else {
  //       $('.full-name')[1].innerHTML = 'N/A'
  //     }

  //     if (`${JSON.stringify(data.location)}` !== 'null') {
  //       $('.location')[1].innerHTML = `${JSON.stringify(data.location).replace(
  //         /"/g,
  //         ''
  //       )}`
  //     } else {
  //       $('.location')[1].innerHTML = 'N/A'
  //     }

  //     if (`${JSON.stringify(data.email)}` !== 'null') {
  //       $('.email')[1].innerHTML = `${JSON.stringify(data.email).replace(
  //         /"/g,
  //         ''
  //       )}`
  //     } else {
  //       $('.email')[1].innerHTML = 'N/A'
  //     }
  //     if (`${JSON.stringify(data.bio)}` !== 'null') {
  //       $('.bio')[1].innerHTML = `${JSON.stringify(data.bio).replace(/"/g, '')}`
  //     } else {
  //       $('.bio')[1].innerHTML = 'N/A'
  //     }

  //     let a = `${JSON.stringify(data['avatar-url']).replace(/"/g, '')}`
  //     $('.avatar')[1].src = a

  //     if (`${JSON.stringify(data.titles.length)}` > 0) {
  //       $('.titles')[1].innerHTML = `${JSON.stringify(data.titles[0]).replace(
  //         /"/g,
  //         ''
  //       )}`
  //       for (let i = 1; i < data.titles.length; ++i) {
  //         $('.titles')[1].innerHTML += `, ${JSON.stringify(
  //           data.titles[i]
  //         ).replace(/"/g, '')}`
  //       }
  //     } else {
  //       $('.titles')[1].innerHTML = `N/A`
  //     }

  //     if (`${JSON.stringify(data['total-stars'])}` !== 'null') {
  //       $('.total-stars')[1].innerHTML = `${JSON.stringify(
  //         data['total-stars']
  //       ).replace(/"/g, '')}`
  //     } else {
  //       $('.total-stars')[1].innerHTML = 'N/A'
  //     }

  //     if (`${JSON.stringify(data['public-repos'])}` !== 'null') {
  //       $('.public-repos')[1].innerHTML = `${JSON.stringify(
  //         data['public-repos']
  //       ).replace(/"/g, '')}`
  //     } else {
  //       $('.public-repos')[1].innerHTML = 'N/A'
  //     }

  //     if (`${JSON.stringify(data['favorite-language'])}` !== 'null') {
  //       $('.favorite-language')[1].innerHTML = `${JSON.stringify(
  //         data['favorite-language']
  //       ).replace(/"/g, '')}`
  //     } else {
  //       $('.favorite-language')[1].innerHTML = 'N/A'
  //     }
  //     console.log(`${JSON.stringify(data['highest-starred'])}`)
  //     if (`${JSON.stringify(data['highest-starred'])}` !== 'null') {
  //       $('.highest-starred')[1].innerHTML = `${JSON.stringify(
  //         data['highest-starred']
  //       ).replace(/"/g, '')}`
  //     } else {
  //       $('.most-starred')[1].innerHTML = 'N/A'
  //     }

  //     if (`${JSON.stringify(data['perfect-repos'])}` !== 'null') {
  //       $('.perfect-repos')[1].innerHTML = `${JSON.stringify(
  //         data['perfect-repos']
  //       ).replace(/"/g, '')}`
  //     } else {
  //       $('.perfect-repos')[1].innerHTML = 'N/A'
  //     }

  //     if (`${JSON.stringify(data['followers'])}` !== 'null') {
  //       $('.followers')[1].innerHTML = `${JSON.stringify(
  //         data.followers
  //       ).replace(/"/g, '')}`
  //     } else {
  //       $('.followers')[1].innerHTML = 'N/A'
  //     }

  //     if (`${JSON.stringify(data['following'])}` !== 'null') {
  //       $('.following')[1].innerHTML = `${JSON.stringify(
  //         data.following
  //       ).replace(/"/g, '')}`
  //     } else {
  //       $('.following')[1].innerHTML = 'N/A'
  //     }

  //     $('.user-results').removeClass('hide') // Display '.user-results' element
  //   })
  //   .catch(err => {
  //     console.log(`Error getting data for ${username2}`)
  //     console.log(err)
  //     /*
  //       TODO
  //       Inject the error into the span in inspect.html error section
  //       If there is an error finding the user, instead toggle the display of the '.user-error' element
  //       and populate it's inner span '.error' element with an appropriate error message
  //     */
  //   })

  return false // return false to prevent default form submission
})

// $('form').submit(() => {
//   // const username2 = $('form input').val()
//   // console.log(`examining ${username2}`)

//   const username2 = $('form input')
//     .eq(1)
//     .val()
//   console.log(`examining ${username2}`)

//   // Fetch data for given user
//   // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
//   fetch(`${USER_URL}/${username2}`)
//     .then(response => response.json()) // Returns parsed json data from response body as promise
//     .then(data => {
//       console.log(`Got data for ${username2}`)
//       console.log(data)
//       /*
//         TODO
//         Inject the data
//         Attach the data returned to the DOM
//         The data currently hard-coded into the DOM is placeholder data
//        */
//       $('right.username')[0].innerHTML = `${JSON.stringify(
//         data.username
//       ).replace(/"/g, '')}`
//       console.log(`${JSON.stringify(data.name)}`)
//       if (`${JSON.stringify(data.name)}` !== 'null') {
//         $('.full-name')[0].innerHTML = `${JSON.stringify(data.name).replace(
//           /"/g,
//           ''
//         )}`
//       } else {
//         $('.full-name')[0].innerHTML = 'N/A'
//       }

//       if (`${JSON.stringify(data.location)}` !== 'null') {
//         $('.location')[0].innerHTML = `${JSON.stringify(data.location).replace(
//           /"/g,
//           ''
//         )}`
//       } else {
//         $('.location')[0].innerHTML = 'N/A'
//       }

//       if (`${JSON.stringify(data.email)}` !== 'null') {
//         $('.email')[0].innerHTML = `${JSON.stringify(data.email).replace(
//           /"/g,
//           ''
//         )}`
//       } else {
//         $('.email')[0].innerHTML = 'N/A'
//       }
//       if (`${JSON.stringify(data.bio)}` !== 'null') {
//         $('.bio')[0].innerHTML = `${JSON.stringify(data.bio).replace(/"/g, '')}`
//       } else {
//         $('.bio')[0].innerHTML = 'N/A'
//       }

//       let a = `${JSON.stringify(data['avatar-url']).replace(/"/g, '')}`
//       $('.avatar')[0].src = a

//       if (`${JSON.stringify(data.titles.length)}` > 0) {
//         $('.titles')[0].innerHTML = `${JSON.stringify(data.titles[0]).replace(
//           /"/g,
//           ''
//         )}`
//         for (let i = 1; i < data.titles.length; ++i) {
//           $('.titles')[0].innerHTML += `, ${JSON.stringify(
//             data.titles[i]
//           ).replace(/"/g, '')}`
//         }
//       } else {
//         $('.titles')[0].innerHTML = `N/A`
//       }

//       if (`${JSON.stringify(data['total-stars'])}` !== 'null') {
//         $('.total-stars')[0].innerHTML = `${JSON.stringify(
//           data['total-stars']
//         ).replace(/"/g, '')}`
//       } else {
//         $('.total-stars')[0].innerHTML = 'N/A'
//       }

//       if (`${JSON.stringify(data['public-repos'])}` !== 'null') {
//         $('.public-repos')[0].innerHTML = `${JSON.stringify(
//           data['public-repos']
//         ).replace(/"/g, '')}`
//       } else {
//         $('.public-repos')[0].innerHTML = 'N/A'
//       }

//       if (`${JSON.stringify(data['favorite-language'])}` !== 'null') {
//         $('.favorite-language')[0].innerHTML = `${JSON.stringify(
//           data['favorite-language']
//         ).replace(/"/g, '')}`
//       } else {
//         $('.favorite-language')[0].innerHTML = 'N/A'
//       }
//       console.log(`${JSON.stringify(data['highest-starred'])}`)
//       if (`${JSON.stringify(data['highest-starred'])}` !== 'null') {
//         $('.highest-starred')[0].innerHTML = `${JSON.stringify(
//           data['highest-starred']
//         ).replace(/"/g, '')}`
//       } else {
//         $('.most-starred')[0].innerHTML = 'N/A'
//       }

//       if (`${JSON.stringify(data['perfect-repos'])}` !== 'null') {
//         $('.perfect-repos')[0].innerHTML = `${JSON.stringify(
//           data['perfect-repos']
//         ).replace(/"/g, '')}`
//       } else {
//         $('.perfect-repos')[0].innerHTML = 'N/A'
//       }

//       if (`${JSON.stringify(data['followers'])}` !== 'null') {
//         $('.followers')[0].innerHTML = `${JSON.stringify(
//           data.followers
//         ).replace(/"/g, '')}`
//       } else {
//         $('.followers')[0].innerHTML = 'N/A'
//       }

//       if (`${JSON.stringify(data['following'])}` !== 'null') {
//         $('.following')[0].innerHTML = `${JSON.stringify(
//           data.following
//         ).replace(/"/g, '')}`
//       } else {
//         $('.following')[0].innerHTML = 'N/A'
//       }

//       $('.user-results').removeClass('hide') // Display '.user-results' element
//     })
//     .catch(err => {
//       console.log(`Error getting data for ${username2}`)
//       console.log(err)
//       /*
//         TODO
//         Inject the error into the span in inspect.html error section
//         If there is an error finding the user, instead toggle the display of the '.user-error' element
//         and populate it's inner span '.error' element with an appropriate error message
//       */
//     })

//   return false // return false to prevent default form submission
// })
