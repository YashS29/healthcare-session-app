import Image from 'next/image';

<Image
  src="/images/avatar.jpg"
  alt="Profile"
  width={40}
  height={40}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
