/**
 * @name Android backup enabled in XML files
 * @description Detects Android applications that have backup enabled, which may lead to sensitive data exposure
 * @kind problem
 * @problem.severity warning
 * @security-severity 7.5
 * @precision high
 * @id custom/android-backup-enabled-all-xml
 * @tags security
 *       external/cwe/cwe-312
 *       external/owasp/m2
 *       external/owasp/m10
 */

import java
import semmle.code.xml.XML

from XMLFile xmlFile, XMLElement application
where
  // Match any XML file (not just AndroidManifest.xml)
  xmlFile.getBaseName().matches("%AndroidManifest%") or
  xmlFile.getBaseName() = "AndroidManifest.xml" or
  // Also check files that contain Android manifest structure
  exists(XMLElement manifest | 
    manifest = xmlFile.getAChild() and
    manifest.getName() = "manifest" and
    manifest.getAttributeValue("package").matches("%.%")
  )
  and
  // Find application elements
  application = xmlFile.getAChild*() and
  application.getName() = "application" and
  (
    // Case 1: allowBackup explicitly set to "true"
    application.getAttributeValue("allowBackup") = "true" or
    // Case 2: allowBackup not specified (defaults to true on Android 6.0+)
    not exists(application.getAnAttribute().getName() = "allowBackup")
  )
select application, "Android application has backup enabled, which may expose sensitive data. Set android:allowBackup=\"false\" to disable automatic backups."