async function getALltweet() {
  const alltweet = await axios({
    method: "get",
    url: "https://comp426fa19.cs.unc.edu/a09/tweets",
    withCredentials: true
  });
  return alltweet;
}

async function showTweets() {
  let tweets = `<div id="tweets">`;
  let alltweet = await getALltweet();
  for (a of alltweet.data) {
    let id = a.id;
    let isLiked = a.isLiked;
    tweets += `<div class="whole">
                        <div>name: ${a.author}</div>
                        <div class="contents">${a.body}</div>
                        <div>${a.likeCount} people like this tweet</div>
                        <div>${a.retweetCount} retweet(s)</div>
                        <div>you have liked this tweet : ${a.isLiked}</div>
                        <div class = "allbuttons">
                            <i onclick = "likeTweet(${id},${isLiked})" class="fa fa-thumbs-up">Like</i>
                            <button onclick ="replyTweet(event)" >Reply</button>
                            <button>Retweet</button>
                        </div>
                        <div class="replyArea">
                        </div>
                </div>
                <br>
                <br>
  `;
  }
  tweets += `</div>`;
  $("#root").append(tweets);
}

async function likeTweet(id, isLiked) {
  if (isLiked) {
    let unlike_url =
      "https://comp426fa19.cs.unc.edu/a09/tweets/" + id + "/unlike";
    const unlike = await axios({
      method: "put",
      url: unlike_url,
      withCredentials: true
    });
    $("#tweets").replaceWith(showTweets());
    return unlike;
  } else {
    let like_url = "https://comp426fa19.cs.unc.edu/a09/tweets/" + id + "/like";
    const like = await axios({
      method: "put",
      url: like_url,
      withCredentials: true
    });
    $("#tweets").replaceWith(showTweets());
    return like;
  }
}

async function replyTweet(event) {
  //let parent = data.id;
  $(`${event.target}`).append(`<div>asdfasd</div>`)

// //   let type = data.type;
//     getReply(parent, data)
//   const result = await axios({
//     method: "post",
//     url: "https://comp426fa19.cs.unc.edu/a09/tweets",
//     withCredentials: true,
//     data: {
//       type: "reply",
//       parent: parent,
//       body: body
//     }
//   });
}

$(function() {
  showTweets();
});
