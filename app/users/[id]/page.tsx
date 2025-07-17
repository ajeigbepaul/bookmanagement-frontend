export default function UserProfilePage() {
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {/* TODO: Fetch and display user info */}
      <div className="mb-6">
        <p className="font-semibold">Username: user1</p>
        <p className="text-gray-600">Email: user1@example.com</p>
      </div>
      <div className="flex gap-8">
        <div>
          <h2 className="font-semibold mb-2">Followers</h2>
          {/* TODO: List followers */}
          <ul className="list-disc pl-4 text-gray-700">
            <li>follower1</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Following</h2>
          {/* TODO: List following */}
          <ul className="list-disc pl-4 text-gray-700">
            <li>following1</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 