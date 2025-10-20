export const DEFAULT_MANIFEST = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">
        
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
    </application>

</manifest>`;

export const ANDROID_PERMISSIONS = [
  {
    name: "android.permission.INTERNET",
    category: "Network",
    description: "Allows applications to open network sockets",
    protectionLevel: "normal"
  },
  {
    name: "android.permission.ACCESS_NETWORK_STATE",
    category: "Network",
    description: "Allows applications to access information about networks",
    protectionLevel: "normal"
  },
  {
    name: "android.permission.ACCESS_WIFI_STATE",
    category: "Network",
    description: "Allows applications to access information about Wi-Fi networks",
    protectionLevel: "normal"
  },
  {
    name: "android.permission.CAMERA",
    category: "Hardware",
    description: "Required to access the camera device",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.READ_EXTERNAL_STORAGE",
    category: "Storage",
    description: "Allows an application to read from external storage",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.WRITE_EXTERNAL_STORAGE",
    category: "Storage",
    description: "Allows an application to write to external storage",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.ACCESS_FINE_LOCATION",
    category: "Location",
    description: "Allows an app to access precise location",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.ACCESS_COARSE_LOCATION",
    category: "Location",
    description: "Allows an app to access approximate location",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.RECORD_AUDIO",
    category: "Hardware",
    description: "Allows an application to record audio",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.READ_CONTACTS",
    category: "Contacts",
    description: "Allows an application to read the user's contacts data",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.WRITE_CONTACTS",
    category: "Contacts",
    description: "Allows an application to write the user's contacts data",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.SEND_SMS",
    category: "SMS",
    description: "Allows an application to send SMS messages",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.RECEIVE_SMS",
    category: "SMS",
    description: "Allows an application to receive SMS messages",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.READ_PHONE_STATE",
    category: "Phone",
    description: "Allows read only access to phone state",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.CALL_PHONE",
    category: "Phone",
    description: "Allows an application to initiate a phone call",
    protectionLevel: "dangerous"
  },
  {
    name: "android.permission.BLUETOOTH",
    category: "Hardware",
    description: "Allows applications to connect to paired bluetooth devices",
    protectionLevel: "normal"
  },
  {
    name: "android.permission.BLUETOOTH_ADMIN",
    category: "Hardware",
    description: "Allows applications to discover and pair bluetooth devices",
    protectionLevel: "normal"
  },
  {
    name: "android.permission.VIBRATE",
    category: "Hardware",
    description: "Allows access to the vibrator",
    protectionLevel: "normal"
  },
  {
    name: "android.permission.WAKE_LOCK",
    category: "System",
    description: "Allows using PowerManager WakeLocks to keep processor from sleeping",
    protectionLevel: "normal"
  },
  {
    name: "android.permission.FOREGROUND_SERVICE",
    category: "System",
    description: "Allows a regular application to use Service.startForeground",
    protectionLevel: "normal"
  }
];

export const PROJECT_STRUCTURE = [
  {
    name: "app",
    type: "folder" as const,
    children: [
      {
        name: "src",
        type: "folder" as const,
        children: [
          {
            name: "main",
            type: "folder" as const,
            children: [
              {
                name: "AndroidManifest.xml",
                type: "file" as const,
                highlight: true
              },
              {
                name: "java",
                type: "folder" as const,
                children: [
                  {
                    name: "com",
                    type: "folder" as const,
                    children: [
                      {
                        name: "example",
                        type: "folder" as const,
                        children: [
                          {
                            name: "myapp",
                            type: "folder" as const,
                            children: [
                              { name: "MainActivity.kt", type: "file" as const }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: "res",
                type: "folder" as const,
                children: [
                  { name: "layout", type: "folder" as const },
                  { name: "values", type: "folder" as const },
                  { name: "drawable", type: "folder" as const },
                  { name: "mipmap", type: "folder" as const }
                ]
              }
            ]
          }
        ]
      },
      { name: "build.gradle", type: "file" as const }
    ]
  },
  { name: "gradle", type: "folder" as const },
  { name: "build.gradle", type: "file" as const },
  { name: "settings.gradle", type: "file" as const }
];
