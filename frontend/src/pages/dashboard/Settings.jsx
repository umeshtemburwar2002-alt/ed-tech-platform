import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCog,
  FaUser,
  FaBell,
  FaShieldAlt,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaExclamationTriangle
} from 'react-icons/fa';
import { Card, Button } from '../../components/ui';
import { deleteProfile, changePassword } from '../../services/operations/SettingsAPI';
import { updateProfile } from '../../services/operations/SettingsAPI';

const Settings = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    contactNumber: user?.additionalDetails?.contactNumber || '',
    about: user?.additionalDetails?.about || '',
    dateOfBirth: user?.additionalDetails?.dateOfBirth || '',
    gender: user?.additionalDetails?.gender || ''
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    marketingEmails: false,
    weeklyDigest: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: FaUser },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'danger', label: 'Danger Zone', icon: FaTrash }
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateProfile(token, profileData));
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      await dispatch(changePassword(token, passwordData));
      setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      console.error('Password change error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type "DELETE" to confirm account deletion.');
      return;
    }
    
    setLoading(true);
    try {
      await dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.error('Account deletion error:', error);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const renderProfileSettings = () => (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-richblack-5 mb-6">Profile Information</h3>
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-richblack-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-richblack-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-richblack-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            disabled
            className="w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-richblack-400 cursor-not-allowed"
          />
          <p className="text-xs text-richblack-400 mt-1">Email cannot be changed</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-richblack-300 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              value={profileData.contactNumber}
              onChange={(e) => setProfileData({ ...profileData, contactNumber: e.target.value })}
              className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-richblack-300 mb-2">
              Gender
            </label>
            <select
              value={profileData.gender}
              onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
              className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-richblack-300 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
            className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-richblack-300 mb-2">
            About
          </label>
          <textarea
            value={profileData.about}
            onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Tell us about yourself..."
          />
        </div>
        
        <Button type="submit" disabled={loading} className="flex items-center space-x-2">
          <FaSave />
          <span>{loading ? 'Saving...' : 'Save Changes'}</span>
        </Button>
      </form>
    </Card>
  );

  const renderSecuritySettings = () => (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-richblack-5 mb-6">Change Password</h3>
      <form onSubmit={handlePasswordChange} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-richblack-300 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.old ? 'text' : 'password'}
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              className="w-full px-3 py-2 pr-10 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-300"
            >
              {showPasswords.old ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-richblack-300 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full px-3 py-2 pr-10 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-300"
            >
              {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-richblack-300 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwordData.confirmNewPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
              className="w-full px-3 py-2 pr-10 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-300"
            >
              {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <Button type="submit" disabled={loading} className="flex items-center space-x-2">
          <FaShieldAlt />
          <span>{loading ? 'Updating...' : 'Update Password'}</span>
        </Button>
      </form>
    </Card>
  );

  const renderNotificationSettings = () => (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-richblack-5 mb-6">Notification Preferences</h3>
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-richblack-700">
            <div>
              <h4 className="text-richblack-5 font-medium">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-sm text-richblack-400">
                {key === 'emailNotifications' && 'Receive notifications via email'}
                {key === 'pushNotifications' && 'Receive push notifications in browser'}
                {key === 'courseUpdates' && 'Get notified about course updates'}
                {key === 'marketingEmails' && 'Receive promotional emails'}
                {key === 'weeklyDigest' && 'Weekly summary of your progress'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-richblack-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
            </label>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderDangerZone = () => (
    <Card className="p-6 border-red-500">
      <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center space-x-2">
        <FaExclamationTriangle />
        <span>Danger Zone</span>
      </h3>
      
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-red-400 mb-2">Delete Account</h4>
        <p className="text-richblack-300 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        
        {!showDeleteConfirm ? (
          <Button
            variant="danger"
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center space-x-2"
          >
            <FaTrash />
            <span>Delete Account</span>
          </Button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-richblack-300 mb-2">
                Type "DELETE" to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3 py-2 bg-richblack-700 border border-red-500 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="DELETE"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={loading || deleteConfirmText !== 'DELETE'}
                className="flex items-center space-x-2"
              >
                <FaTrash />
                <span>{loading ? 'Deleting...' : 'Confirm Delete'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-richblack-5 mb-2 flex items-center space-x-3">
            <FaCog className="text-yellow-400" />
            <span>Settings</span>
          </h1>
          <p className="text-richblack-300">
            Manage your account settings and preferences.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-1/4"
          >
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-yellow-400 text-richblack-900'
                          : 'text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5'
                      }`}
                    >
                      <IconComponent className="text-lg" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-3/4"
          >
            {activeTab === 'profile' && renderProfileSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'danger' && renderDangerZone()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;