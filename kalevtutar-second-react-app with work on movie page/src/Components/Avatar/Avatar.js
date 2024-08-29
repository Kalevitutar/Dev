import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import "./Avatar.css";

function Avatar() {
    return (
        <div className="avatar">
            <AvatarEditor
                // image="http://example.com/initialimage.jpg"
                img src="src/Assets/addavatar.png" alt="avatar add"
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
            />
        </div>
    );
  }

export default Avatar;