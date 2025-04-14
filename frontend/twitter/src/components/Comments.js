import React from 'react';
import Comment from './Comment';
import {useSelector} from "react-redux";

const Comments = ({tweet}) => {
  const { user } = useSelector(store => store.user);

  return (
    <div>
      {
        tweet?.comments?.map((comment) => {
          return (
            <Comment key={comment._id} comment={comment} user={user} tweet={tweet}/>
          )
        })
      }
    </div>
  )
}

export default Comments
