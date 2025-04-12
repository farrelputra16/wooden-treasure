import React, { useState } from 'react';
import swal from 'sweetalert';

const ClaimReward = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    tokens: '',
    tgUsername: '',
    proofImage: null,
  });

  // State for submitted entries
  const [submissions, setSubmissions] = useState([]);

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        swal('Error', 'Please upload an image file', 'error');
        return;
      }
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        swal('Error', 'Image size must be less than 5MB', 'error');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        proofImage: file,
      }));
      // Set image preview
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.tokens || !formData.tgUsername || !formData.proofImage) {
      swal('Error', 'Please fill all fields and upload an image', 'error');
      return;
    }

    // Add submission to display
    setSubmissions((prev) => [
      ...prev,
      {
        tokens: formData.tokens,
        tgUsername: formData.tgUsername,
        imageUrl: imagePreview,
      },
    ]);

    // Prepare data for Telegram
    const telegramBotToken = '7548203910:AAGdJNTJie2GrhFsTwEBLrIYPx_9W3xy-8U'; // Replace with your bot token
    const telegramChatId = '1721799075'; // Replace with your chat ID
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendPhoto`;

    const formDataToSend = new FormData();
    formDataToSend.append('chat_id', telegramChatId);
    formDataToSend.append('photo', formData.proofImage);
    formDataToSend.append(
      'caption',
      `New Reward Claim:\nTokens: ${formData.tokens}\nTelegram: ${formData.tgUsername}`
    );

    try {
      // Send to Telegram
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.ok) {
        swal('Success', 'Reward claim submitted and sent to Telegram!', 'success');
      } else {
        throw new Error(result.description);
      }
    } catch (error) {
      console.error('Telegram API error:', error);
      swal('Error', 'Failed to send to Telegram. Submission saved locally.', 'error');
    }

    // Reset form
    setFormData({
      tokens: '',
      tgUsername: '',
      proofImage: null,
    });
    setImagePreview(null);
  };

  return (
    <>
      <div className="my-5">
        <h1 className="text-center">Claim Your Reward</h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="tokens" className="form-label">
                  Token Holdings
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="tokens"
                  name="tokens"
                  value={formData.tokens}
                  onChange={handleInputChange}
                  placeholder="Enter your token amount"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tgUsername" className="form-label">
                  Telegram Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tgUsername"
                  name="tgUsername"
                  value={formData.tgUsername}
                  onChange={handleInputChange}
                  placeholder="@YourUsername"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="proofImage" className="form-label">
                  Proof Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="proofImage"
                  name="proofImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {imagePreview && (
                  <div className="image-preview mt-3">
                    <img src={imagePreview} alt="Proof Preview" />
                  </div>
                )}
              </div>
              <div className="col-12">
                <button className="btn btn-outline-primary mt-3" type="submit">
                  Submit Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Display Submissions */}
      {submissions.length > 0 && (
        <div className="container my-5">
          <h2 className="text-center">Submitted Claims</h2>
          <div className="row">
            {submissions.map((submission, index) => (
              <div key={index} className="col-md-4 col-12 mb-4">
                <div className="submission-card">
                  <img src={submission.imageUrl} alt="Proof" />
                  <div className="submission-details">
                    <p>
                      <strong>Tokens:</strong> {submission.tokens}
                    </p>
                    <p>
                      <strong>Telegram:</strong> {submission.tgUsername}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimReward;