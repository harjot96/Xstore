import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Play,
  RefreshCw,
  Database
} from "lucide-react";
import { ImportResult } from "@/types/admin";

export default function Import() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDryRun, setIsDryRun] = useState(true);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const mockImportResult: ImportResult = {
    totalProcessed: 150,
    created: 120,
    updated: 25,
    skipped: 5,
    errors: [
      { line: 45, message: "Invalid package format", data: { package: "invalid.package" } },
      { line: 78, message: "Category name too long", data: { name: "Very long category name that exceeds limits" } },
      { line: 92, message: "Duplicate app package", data: { package: "com.duplicate.app" } }
    ]
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setImportResult(mockImportResult);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const sampleJsonStructure = `{
  "categories": [
    {
      "title": "Productivity",
      "packages": [
        "com.example.todoapp",
        "com.example.calendar",
        "com.example.notes"
      ]
    },
    {
      "title": "Entertainment", 
      "packages": [
        "com.example.musicplayer",
        "com.example.videostreaming"
      ]
    }
  ]
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Import Data</h1>
          <p className="text-muted-foreground">Import categories and apps from JSON files or external APIs</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Template
        </Button>
      </div>

      <Tabs defaultValue="json-import" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="json-import">JSON File Import</TabsTrigger>
          <TabsTrigger value="api-import">API Import</TabsTrigger>
        </TabsList>

        {/* JSON Import Tab */}
        <TabsContent value="json-import" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload JSON File
                </CardTitle>
                <CardDescription>
                  Upload a JSON file containing categories and app packages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Drop your JSON file here</p>
                    <p className="text-xs text-muted-foreground">or click to browse files</p>
                  </div>
                  <Input type="file" accept=".json" className="mt-4" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dry-run"
                      checked={isDryRun}
                      onChange={(e) => setIsDryRun(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="dry-run" className="text-sm">
                      Dry run (preview only)
                    </Label>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={handleFileUpload} 
                    disabled={isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : isDryRun ? (
                      <Eye className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {isUploading ? "Processing..." : isDryRun ? "Preview Import" : "Start Import"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Format Guide */}
            <Card>
              <CardHeader>
                <CardTitle>JSON Format Guide</CardTitle>
                <CardDescription>
                  Expected structure for your import file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">File Structure</Label>
                    <pre className="mt-2 text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                      <code>{sampleJsonStructure}</code>
                    </pre>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Requirements:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                      <li>• Category titles must be unique (case-insensitive)</li>
                      <li>• Package names must be valid app package identifiers</li>
                      <li>• Maximum 100 categories per import</li>
                      <li>• Maximum 1000 apps per import</li>
                      <li>• File size limit: 10MB</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Import Results */}
          {importResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Import Results
                  {isDryRun && <Badge variant="outline">Preview Mode</Badge>}
                </CardTitle>
                <CardDescription>
                  {isDryRun ? "Preview of changes that would be made" : "Summary of completed import"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{importResult.totalProcessed}</div>
                    <div className="text-sm text-muted-foreground">Total Processed</div>
                  </div>
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">{importResult.created}</div>
                    <div className="text-sm text-muted-foreground">Created</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">{importResult.updated}</div>
                    <div className="text-sm text-muted-foreground">Updated</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-muted-foreground">{importResult.skipped}</div>
                    <div className="text-sm text-muted-foreground">Skipped</div>
                  </div>
                </div>

                {importResult.errors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-destructive flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Errors ({importResult.errors.length})
                    </h4>
                    <div className="space-y-2">
                      {importResult.errors.map((error, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                          <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Line {error.line}</p>
                            <p className="text-sm text-muted-foreground">{error.message}</p>
                            {error.data && (
                              <pre className="text-xs bg-muted/50 p-2 rounded mt-2 overflow-x-auto">
                                {JSON.stringify(error.data, null, 2)}
                              </pre>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isDryRun && importResult.errors.length === 0 && (
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="font-medium text-success">Ready to import</span>
                    </div>
                    <Button onClick={() => setIsDryRun(false)}>
                      <Play className="w-4 h-4 mr-2" />
                      Execute Import
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* API Import Tab */}
        <TabsContent value="api-import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>External API Import</CardTitle>
              <CardDescription>
                Import data from external app store APIs or third-party services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">API Endpoint</Label>
                    <Input 
                      id="api-endpoint" 
                      placeholder="https://api.example.com/apps" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input 
                      id="api-key" 
                      type="password" 
                      placeholder="Your API key" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="field-mapping">Field Mapping (JSON)</Label>
                  <Textarea 
                    id="field-mapping"
                    placeholder='{"name": "app_name", "package": "bundle_id", "category": "genre"}'
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Start Import
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Import History */}
          <Card>
            <CardHeader>
              <CardTitle>Import History</CardTitle>
              <CardDescription>Recent API import activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No API imports yet</p>
                <p className="text-sm">Your import history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}