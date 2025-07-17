export default function BookDetailPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Book Title</h1>
      <p className="text-gray-600 mb-2">by Author Name</p>
      <p className="mb-6">Book description goes here...</p>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      {/* TODO: Fetch and display comments */}
      <div className="space-y-2">
        <div className="border rounded p-2">
          <p className="text-gray-800">Great book!</p>
          <span className="text-xs text-gray-500">by user1</span>
        </div>
      </div>
      {/* TODO: Add comment form */}
    </div>
  );
}
