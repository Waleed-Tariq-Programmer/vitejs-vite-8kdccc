import React, { useEffect, useState } from 'react';
import PostCard from '../Component/PostCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

const Home = () => {
  const [allpost, setAllpost] = useState([]);

  const getPost = async () => {
    const postsArray = [];
    const postref = collection(db, 'posts');
    const querySnapshot = await getDocs(postref);

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      let createdAt = 'Time not available';

      // Convert Firestore Timestamp to a readable string
      if (postData.createdAt && postData.createdAt.seconds) {
        const date = new Date(postData.createdAt.seconds * 1000); // Convert seconds to milliseconds
        createdAt = date.toLocaleTimeString(); // Format the date as needed
      }

      postsArray.push({
        ...postData,
        createdAt, // Store formatted time string
      });
    });

    setAllpost(postsArray);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex items-center flex-col">
      {allpost.map((post, index) => (
        <PostCard
          key={index}
          name={post.name}
          date={post.date}
          profile={post.profile}
          post={post.post}
          content={post.content}
          createdAt={post.createdAt} 
          likeCount={120} 
          commentCount={30} 
        />
      ))}
    </div>
  );
};

export default Home;
