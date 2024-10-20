import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Graduation Year: {user.graduationYear}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
