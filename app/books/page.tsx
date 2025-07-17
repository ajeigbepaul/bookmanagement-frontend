export default function BooksPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Books</h1>
      {/* TODO: Fetch and display list of books */}
      <div className="space-y-4">
        {/* Example book card */}
        <div className="border rounded p-4 shadow">
          <h2 className="font-semibold">Book Title</h2>
          <p className="text-sm text-gray-600">by Author Name</p>
          <p className="mt-2 text-gray-700">Book description goes here...</p>
        </div>
      </div>
    </div>
  );
} 