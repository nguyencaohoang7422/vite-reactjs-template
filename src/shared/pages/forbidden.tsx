const PageForbidden = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>No permission</h1>
      <p>Sorry,you not permission to access this page.</p>
      <a href="/">Go back to Home</a>
    </div>
  );
};

export default PageForbidden;
